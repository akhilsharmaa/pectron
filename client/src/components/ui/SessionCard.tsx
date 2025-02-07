export const SessionCard = (session: {"title":string, "sessionId": string}) => {
    const url = `app?sessionId=${session.sessionId}`;
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </a>
            <a href={url}>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {session.title}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {session.title}
                    </p> 
                </div>
            </a>

        </div>
    )
}
  