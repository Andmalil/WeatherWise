function getLocation(success, error) {
    const successMessage = (position) => {
        console.log(position)
        }
        const errorMessage = (error) => {
        console.log(error)
        }
        navigator.geolocation.getCurrentPosition(success, error)
}
