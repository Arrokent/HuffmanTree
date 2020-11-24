/**
 * @author: chibiken
 * @create: 2020/11/24
 */

/*
 * 读取str各字符的频率，返回一个对象freq
 * for buildHT
 */
function getFreq(str) {
    // first change str into encodeURI form
    var encodeStr = encodeURI(str);
    // an object to store each character's frequency
    var strFreq = {};

    for (var i = 0; i < encodeStr.length; i++) {

        // if the character begin with %, means that it's a Chinese character
        if (encodeStr[i] === '%') {

            // read nine characters because 9char is a Chinese character
            var char = ''
            for (var j = i; j < i + 9; j++)
                char += encodeStr[j];

            // Have had this character, then strFreq[str] ++; if not, new an attr
            if (!strFreq[char])
                // new a attribute, and key is str, value is 1, which typeof num
                strFreq[char] = 1;
            else
                strFreq[char]++;

            // if read 9 characters, then jump to the next one
            i += 8;
        }

        // else the character is an english or ASCII code, encodeURI won't affect
        else {

            var char = encodeStr[i]
            // same as Chinese character, have had -> ++, not -> new
            if (!strFreq[char])
                strFreq[char] = 1;
            else
                strFreq[char]++;
        }


    }

    //console.log(strFreq);
    return strFreq;
}


/*
 * 查找当前freq中，count最小的那一个字符
 * for buildHT
 */
function findMinIndex(freq) {
    var minCount = 100000;
    var minIndex = -1;
    var type = 'number';

    // use jQuery each function to iterate each key&value
    $.each(freq, function (index, value) {

        // if the node is only a value&key
        if (typeof value == 'number') {
            // store the min count and index
            if (value < minCount) {
                type = 'number';
                minCount = value;
                minIndex = index;
            }
        }

        // else if the node is a tree
        else {
            if (value.count < minCount) {
                type = 'object'
                minCount = value;
                minIndex = index;
            }
        }
    })

    // return an index or an object

    return minIndex;
}


/*
 * 构建huffman编码树
 */
function buildHT(freq) {

    // while there are more than one node in the freq
    while (Object.getOwnPropertyNames(freq).length >= 2) {

        var min1Index = findMinIndex(freq);

        // check if min1 is an legal number
        if (!min1Index)
            alert('findMinIndex error! return -1');

        // get the first min index, and delete it in the freq
        var min1Count = freq[min1Index];

        // if the min1Index is a tree, then the freq[minIndex] is an object
        if (typeof min1Count == 'object') {
            min1Count = min1Count.count
            var temp1 = freq[min1Index]
        }

        delete freq[min1Index];


        // find the second min character, same as min1
        var min2Index = findMinIndex(freq);
        if (!min2Index)
            alert('findMinIndex error! return -1');
        var min2Count = freq[min2Index];
        if (typeof min2Count == 'object') {
            min2Count = min2Count.count
            var temp2 = freq[min2Index]
        }
        delete freq[min2Index];

        var min1 = new Object();
        min1.count = min1Count;

        // if temp1 exist, means that this min1Index is an object
        if (!temp1) {
            min1.index = min1Index;
        } else {
            min1.index = temp1;
        }

        var min2 = new Object();
        min2.count = min2Count;
        if (!temp2) {
            min2.index = min2Index;
        } else {
            min2.index = temp2;
        }

        var obj = new Object();
        obj.min1Index = min1;
        obj.min2Index = min2;
        obj.count = min1Count + min2Count;

        // insert the new one, a binary tree
        freq[min1Index + "+" + min2Index] = obj;

    }
}


/*
 * 生成字符的huffman树编码
 */
function getCode(freq) {
    // check if the freq has already been built
    if (Object.getOwnPropertyNames(freq).length > 1)
        alert("Please build Huffman tree first");


}