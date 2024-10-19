import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <div className="not-found-container">
        <h1>Oops! This page is missing...</h1>
        <p>It seems the page you're looking for has disappeared or never existed!</p>
        <div className="cat-gif">
          <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="Funny Cat" />
        </div>
        <p>But don't worry, here's a cat to cheer you up. Why not head back to the homepage?</p>
        <a href="/" className="home-button">Go to Homepage</a>
      </div>
    </Layout>
  );
}

export default NotFound;
