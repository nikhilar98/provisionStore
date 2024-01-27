

const About = (props) => {


    return (
        <div className="about-container">
            <h1>About</h1>
            <hr />
            <h2>Folder structure</h2>
            <p>The project has mainly 3 folders : </p>
            <ul>
                <li>node modules : Contains all the dependencies required in the project.</li>
                <li>public : Contains the index.html file and the favicon image.</li>
                <li>src : Contains 3 subfolders and a few files, namely: 
                        <ol>
                            <li>The index.js, app.jsx and index.css where the styling for the app is written.</li>
                            <li>components : Contains the various components in the app.</li>
                            <li>images : Contains all the images required in the app.</li>
                            <li>reducers : Contains all the reducers used to manage the app state.</li>
                        </ol>
                </li>
            </ul>
            <h3>Difficulties faced : </h3>
            <ul>
                <li>Persisting the user session on refresh, as the app data is reset on refresh.
                This was managed by storing the user data in local storage.</li>
                <li>Favicon icon was not displayed when the app was being deployed online.
                    Later solved it by placing the logo file in the same directory as index.html.</li>
            </ul>
            <h4>Steps to start the project</h4>
            <ul>
                <li><strong>git clone <a href="">https://github.com/nikhilar98/provisionStore</a></strong></li>
                <li><strong>cd provisionStore</strong></li>
                <li><strong>npm install</strong></li>
                <li><strong>npm start</strong></li>
            </ul>
            <h5>The app is also live on this link. <a href="https://provision-store-amber.vercel.app/">Link</a></h5>
        </div>
    )
}


export default About