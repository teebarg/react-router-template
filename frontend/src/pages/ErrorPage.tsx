import { email, messages } from "@/config";
import resetApp from "@/utils/reset-app";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouteError } from "react-router-dom";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = useRouteError();
    // console.error(error);
    return (
        <div>
            <div className="h-screen flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center flex-1">
                    <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden bg-content1 p-8">
                        <div className="px-6 py-8">
                            <h1 className="text-4xl font-bold mb-1">Oops! Internal Server Error</h1>
                            <p className="text-lg mb-6">Sorry, an unexpected error has occurred.</p>
                            <p className="mb-8">{error.statusText || error.message}</p>
                            <Button variant="bordered" target="_blank" rel="noreferrer" href={`mailto: ${email}`}>
                                {messages.app.crash.options.email}
                            </Button>
                            <Link href="/" className="mt-2">
                                Go back to homepage
                            </Link>
                            <Button onClick={resetApp} color="danger" className="block mt-6">
                                {messages.app.crash.options.reset}
                            </Button>
                        </div>
                        <div className="px-6 py-4 border-t border-default-200 text-sm text-default-700">
                            If the problem persists, please contact our support team.
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ErrorPage;
