import { useEffect, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'

const FunctionalIFrame = ({
  children,
  styleSelector,
  onIFrameMount,
  classes,
  ...props
}: {
  children: React.ReactNode
  styleSelector: string
  onIFrameMount: (mountNode: HTMLElement) => void
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

  useEffect(() => {
    if (mountNode) {
      onIFrameMount(mountNode)
    }
  }, [mountNode])

  return (
    <iframe className={classes} {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

export default FunctionalIFrame
