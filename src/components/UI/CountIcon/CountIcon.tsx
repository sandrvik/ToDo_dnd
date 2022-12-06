import './CountIcon.scss'

type CountIconProps = {
  children: number | string
}

export const CountIcon = ({ children }: CountIconProps): JSX.Element => {
  return <span className="countIcon">{children}</span>
}
