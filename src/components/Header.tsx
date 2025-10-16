import '../Header.css';
import CustomNavLink from './CustomLink';

export const setActive = ({isActive}: any) => isActive ? "active-link" : ''

function Header() {
  return (
    <header className="header">
      <div className="logo"></div>
      <CustomNavLink to="/VacanseeNew/vacancies" className={setActive}>
        Вакансии FE
      </CustomNavLink>
      <CustomNavLink to="/VacanseeNew/about" className={setActive}>
        <div className="profile"></div>
        Обо мне
      </CustomNavLink>
    </header>
  );
}

export default Header;
