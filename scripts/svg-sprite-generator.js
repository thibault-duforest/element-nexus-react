import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import File from 'vinyl'
import SVGSpriter from 'svg-sprite'
import winston from "winston";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root_dir = path.resolve(__dirname, '..')

const allowedSmallImages = []
const allowedMediumImages = []
const allowedLargeImages = []

const getLogger = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug'
            })
        ],
        level: 'debug'
    });
};

const config = {
    dest: `${root_dir}/app/assets/svg/`,
    log: getLogger(),
    mode: {
        view: {
            dest: '',
            dimensions: true,
            sprite: 'svg-sprite.svg',
            bust: false,
            layout: 'vertical',
            render: {
                scss: {
                    template: `${root_dir}/app/assets/templates/_sprite-svg-template.mustache`,
                    dest: `${root_dir}/app/assets/scss/_svg-sprite.scss`
                }
            }
        }
    }
}

const spriter = new SVGSpriter(config)
const cwd = path.resolve(`${root_dir}/app/medias/svg/`);

fs.readdir(cwd, function (err, files) {
    if (err) {
        console.error("Could not list directory:", err)
        process.exit(1)
    }

    files.forEach(function (file) {
        spriter.add(new File({
            path: path.join(cwd, file),
            base: cwd,
            contents: fs.readFileSync(path.join(cwd, file))
        }))
    })

    spriter.compile((err, result) => {
        if (err) {
            console.error("Compilation error:", err)
            process.exit(1)
        }

        for (const mode in result) {
            for (const resource in result[mode]) {
                fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true })

                switch (resource) {
                    case 'scss':
                        let content = result[mode][resource].contents.toString('utf8')

                        content = removeUnallowedImages(content, {
                            allowedSmallImages,
                            allowedMediumImages,
                            allowedLargeImages
                        })

                        fs.writeFileSync(result[mode][resource].path, Buffer.from(content, 'utf8'))
                        break;
                    case 'sprite':
                        fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents)
                        break;
                }
            }
        }
    })
})

function removeUnallowedImages(content, allowedImages) {
    const { allowedSmallImages, allowedMediumImages, allowedLargeImages } = allowedImages
    const smallSizeImagesSelectors = getAllowedSizeImagesSelectors(content, allowedSmallImages, 'small')
    const mediumSizeImagesSelectors = getAllowedSizeImagesSelectors(content, allowedMediumImages, 'medium')
    const largeSizeImagesSelectors = getAllowedSizeImagesSelectors(content, allowedLargeImages, 'large')

    content = content.replaceAll(/\.sprite-common-[^}]*?(small|medium|large)[^}]*?}/g, '')
    content = content.replace(/(\/\/ Remove newlines)[ \t]*\n+/g, '$1 ')
    content = content.replace('// Remove newlines', '');

    if (smallSizeImagesSelectors.length > 0) {
        content = content + smallSizeImagesSelectors.join('\n')
    } else {
        content = content.replace(/\[class\*="sprite-common-small"[^}]*}/g, '')
    }

    if (mediumSizeImagesSelectors.length > 0) {
        content = content + mediumSizeImagesSelectors.join('\n')
    } else {
        content = content.replace(/\[class\*="sprite-common-medium"[^}]*}/g, '')
    }

    if (largeSizeImagesSelectors.length > 0) {
        content = content + largeSizeImagesSelectors.join('\n')
    } else {
        content = content.replace(/\[class\*="sprite-common-large"[^}]*}/g, '')
    }

    return content
}

function getAllowedSizeImagesSelectors(content, allowedImages, size) {
    const imageSelectors = []

    allowedImages.map(imageName => {
        const regex = new RegExp(String.raw`\s(?=.*${imageName}:before \{\n)(\.sprite-common-${size}-[^}]*})\s`, "g")
        const match = content.match(regex)

        if (match) {
            imageSelectors.push(match.toString())
        }
    })

    return imageSelectors
}
