import './CountIcon.scss';

type CountIconProps = {
  children: number | string;
};

export function CountIcon({ children }: CountIconProps): JSX.Element {
  return <span className="countIcon">{children}</span>;
}
