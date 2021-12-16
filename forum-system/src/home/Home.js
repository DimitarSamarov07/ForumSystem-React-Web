import CategoriesCollapse from "./CategoriesCollapse.js";
import LatestPosts from "./LatestPosts.js";
import MostPopularPosts from "./MostPopularPosts.js";

function Home() {
    let changeCategoryCollapseText = () => {
        let elem = document.getElementById("toggleCategoriesBtn");
        if (elem.value === "Hide list of categories") elem.value = "Show list of categories";
        else elem.value = "Hide list of categories";
    }

    return (

        <div className="text-center">
            <h1 className="display-4">Welcome</h1>

            <br/>
            <input onClick={changeCategoryCollapseText} className="btn btn-outline-primary btn-block btn-lg"
                   type="button"
                   data-toggle="collapse"
                   data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                   value="Show list of categories" id="toggleCategoriesBtn"/>

            <div className="collapse" id="collapseExample">
                <CategoriesCollapse/>
            </div>

            <br/><br/>

            <div className="row">
                <LatestPosts/>
                <MostPopularPosts/>
            </div>
        </div>

    );
}

export default Home;
