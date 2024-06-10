import "./HamburgerMenu.css";

const HamburgerMenu = ({ onClick }) => {
    return (
        <div className="burger__wrapper">
            <input type="checkbox" id="burger__input" className="burger__input" />
            <label htmlFor="burger__input" className="burger__label burger__label--arrowright" onClick={onClick}>
                <span className="burger__lines">
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                </span>
            </label>
        </div>
    );
};

export default HamburgerMenu;
