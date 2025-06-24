import LoadingSpinner from "@/components/loading-spinner";


export default function PageLoading() {
    return (
        <div className="h-screen flex items-center justify-center opacity-80">
            <LoadingSpinner />
        </div>
    )
}
