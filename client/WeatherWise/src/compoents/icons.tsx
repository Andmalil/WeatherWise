import { SVGProps } from 'react'


export const Magnifier = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" {...props}>
        <path d="M11.7,10.3c2.1-2.9,1.5-7-1.4-9.1s-7-1.5-9.1,1.4s-1.5,7,1.4,9.1c2.3,1.7,5.4,1.7,7.7,0h0c0,0,0.1,0.1,0.1,0.1l3.8,3.8
	c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4l-3.8-3.9C11.8,10.4,11.8,10.4,11.7,10.3L11.7,10.3z M12,6.5c0,3-2.5,5.5-5.5,5.5S1,9.5,1,6.5
	S3.5,1,6.5,1S12,3.5,12,6.5"/>
    </svg>
)

export const ClearAll = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>
)