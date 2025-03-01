import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const FunctionalIFrame = ({
  children,
  styleSelector,
  classes,
  ...props
}: {
  children: React.ReactNode
  styleSelector: string
  classes?: string
  props?: any
}) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null)
  const mountNode = contentRef?.contentWindow?.document.body

  useEffect(() => {
    if (!contentRef) {
      return
    }

    const win = contentRef?.contentWindow
    const linkEls = win?.parent.document.querySelectorAll(styleSelector)

    if (win && !!linkEls && linkEls.length) {
      linkEls.forEach((el: Node) => {
        win.document.head.appendChild(el)
      })
    }
  }, [contentRef, styleSelector])

  return (
    <iframe className={classes} {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

export default FunctionalIFrame
