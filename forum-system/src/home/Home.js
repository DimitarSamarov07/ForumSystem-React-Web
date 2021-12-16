import CategoriesCollapse from "./CategoriesCollapse.js";
import LatestPosts from "./LatestPosts.js";
import MostPopularPosts from "./MostPopularPosts.js";

function Home() {
    return (

        <div className="text-center">
            <h1 className="display-4">Welcome</h1>

            <br/>
            {/*TODO: Add click functionality*/}
            <input className="btn btn-outline-primary btn-block btn-lg" type="button"
                   data-toggle="collapse"
                   data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                   value="Show list of categories" id="myButton1"/>

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
