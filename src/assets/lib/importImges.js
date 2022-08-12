export default importAll(require.context('../images', true, /\.(png|jpe?g|svg|gif)$/));

function importAll (r) {
    const images = {};

    r.keys().map(function(item, index){
        let key = r.keys()[index];
        return images[key.substring(key.lastIndexOf('/')+1)] = r.keys().map(r)[index];
    })
    return images;
}