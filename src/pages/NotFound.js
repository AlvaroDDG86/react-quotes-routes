import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <>
            <main className="centered">
                <h1>404 - Page not found</h1>
            </main>
            <Link to="/">Go Quotes</Link>
        </>
    )
}

export default NotFound