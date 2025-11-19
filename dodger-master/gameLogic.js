function checkCollisionBetween(obj1, obj2){
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

function isWithinBounds (x, width, canvasWidth){
    return x >=0 && x + width <= canvasWidth
}

module.exports = {
    checkCollisionBetween,
    isWithinBounds
};