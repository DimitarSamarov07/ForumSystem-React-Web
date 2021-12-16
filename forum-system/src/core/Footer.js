import React from "react";

const Footer = () => {

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    return (
        <footer className="border-top footer text-muted">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        &copy; 2021 - ForumSystem - <a href="https://github.com/DimitarSamarov07/ForumSystem-React-Web">Open
                        Source Project</a>
                    </div>
                    <div className="col-md-4 text-right"><a className="btn btn-outline-secondary"
                                                            onClick={topFunction}>Go
                        back to the top
                        <i className="fa fa-arrow-up"/></a></div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;