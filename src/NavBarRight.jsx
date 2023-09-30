import { useState, useRef, useEffect } from "react"

export const NavBarRight = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hamburgerAndOverLayRef = useRef(null);

    const hamburgerHandler = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const hamburgerContainer = document.querySelector(".hamburgerContainer");
        const overLayMenu = document.querySelector(".overLayMenu");
        const handleClickOutside = (event) => {
            hamburgerContainer.classList.toggle("hamburgerIconContainerFoucs");
            overLayMenu.classList.toggle("overLayNone");
            if (
                hamburgerAndOverLayRef.current &&
                !hamburgerAndOverLayRef.current.contains(event.target)
            ) {
                // hamburgerContainer.classList.remove("open");
                hamburgerContainer.classList.remove("hamburgerIconContainerFoucs");
                overLayMenu.classList.add("overLayNone");
                // overLayMenu.classList.remove("open");
            }
        }

        document.addEventListener("click",handleClickOutside);

        return () => {
            document.removeEventListener("click",handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="hamburgerAndOverLay" ref={hamburgerAndOverLayRef}>
                <div className="hamburgerIconContainer">
                    {/* <div className={`hamburgerContainer ${isOpen?'open':''}`} onClick={hamburgerHandler}> */}
                    <div className="hamburgerContainer" onClick={hamburgerHandler}>
                        <div className="line1 hamburger"></div>
                        <div className="line2 hamburger"></div>
                        <div className="line3 hamburger"></div>
                    </div>
                </div>

                {/* <div className={`overLayMenu ${isOpen? 'open' : 'overLayNone'}`}> */}
                <div className="overLayMenu overLayNone">
                        <div>Home</div><br/>
                        <div>About</div><br/>
                        <div>Services</div><br/>
                </div>
                {/* <div className={`overLayContainer ${isOpen? 'open' : 'overLayNone'}`} id="overLayContainerId">
                </div> */}
            </div>
        </div>
    )
}