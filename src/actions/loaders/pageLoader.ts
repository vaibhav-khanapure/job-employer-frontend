import useLoaderStore from "@/src/store/loaderStore";

const pageLoader = {
    show: (text?: string) => {
        useLoaderStore.setState({
            pageLoader: {
                show: true,
                ...(text ? { text } : {})
            }
        });
    },
    close: () => {
        useLoaderStore.setState({
            pageLoader: {
                show: false,
                text: ''
            }
        });
    }
};

export default pageLoader;