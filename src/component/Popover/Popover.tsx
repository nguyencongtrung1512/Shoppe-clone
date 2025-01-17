import { arrow, FloatingPortal, useFloating, shift, offset, type Placement } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useId } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: React.ElementType
  initialOpen?: boolean
  placement?: Placement
}
export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  placement
}: Props) {
  const [isOpen, setisOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const id = useId()
  const showPopover = () => {
    setisOpen(true)
  }
  const hidePopover = () => {
    setisOpen(false)
  }
  return (
    <div>
      <Element className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                  // ...floatingStyles
                }}
                // {...getFloatingProps()}
                initial={{ opacity: 0, transform: `scale(0)` }}
                animate={{ opacity: 1, transform: `scale(1)` }}
                exit={{ opacity: 0, transform: `scale(0)` }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef}
                  className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                />
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </Element>
    </div>
  )
}
