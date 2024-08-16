import { ExclamationIcon } from "nui-react-icons";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const NotFound: React.FC<Props> = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-content1">
            <div className="max-w-md mx-auto text-center">
                {/* <iframe src={giphy404} width="100%" height="50%" style={{ maxHeight: "60%", maxWidth: "100%" }} frameBorder="0" allowFullScreen /> */}
                <ExclamationIcon className="w-20 h-20 mx-auto text-danger" />
                <h1 className="text-4xl font-bold mt-6">Oops! Page Not Found</h1>
                <p className="text-default-500 mt-4">{`The page you're looking for doesn't exist or has been moved.`}</p>
                <Link to="/" className="bg-primary text-white font-semibold py-2 px-4 rounded mt-6 inline-block">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
