import type { SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'path'> {
    path?: string | string[];
    width?: string | number | undefined;
    height?: string | number | undefined;
    viewBox?: string;
    color?: string;
}

function Icon({ path, width = 24, height = 24, viewBox = '0 0 24 24', color = '000000', ...props }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill={color} {...props}>
            <g>
                {(Array.isArray(path))
                    ? path.map((item, index) => <path key={`${index},${item}`} d={item} />)
                    : <path d={path} />
                }
            </g>
        </svg>
    )
}

export default Icon;