import create from 'zustand';
import axios from 'axios';

const landStore = (set) => ({
    auth: false,
    setAuth: (value) => set({ auth: value }),
    landInfo: [],
    fetchLandInfo: () => {
        try {
            axios.get("http://localhost:3000/lands")
            .then((res) => set({ landInfo: res.data.lands }))
        } catch (error) {
            console.log(error)
        }
    }
})

const useLandStore = create(landStore)

export default useLandStore