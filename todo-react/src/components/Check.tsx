import { SVGProps } from 'react';

function Check(props: SVGProps<SVGSVGElement>){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill='none' stroke={props.stroke}>
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#57ddff'}} />
                    <stop offset="100%" style={{ stopColor: '#c058f3'}} />
                </linearGradient>
            </defs>
            <circle cx="10" cy="10" r="9" stroke='#cacde8' strokeWidth="2" fill={props.fill}/>
            <path strokeWidth="2" d="M4 10L8 14L16 6" />
        </svg>
    )
}

export default Check;