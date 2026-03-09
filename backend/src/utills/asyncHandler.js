export default function asyncHandler(handler) {
    return () => {
        try {
            handler()
        } catch (error) {
                throw error
        }
    }
}