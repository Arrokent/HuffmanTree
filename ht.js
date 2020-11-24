/*
 * 读取str各字符的频率，返回一个对象，key：字符，value：出现的次数
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
        if (typeof min1Count == 'object')
            min1Count = min1Count.count

        delete freq[min1Index];

        // find the second min character, same as min1
        var min2Index = findMinIndex(freq);
        if (!min2Index)
            alert('findMinIndex error! return -1');
        var min2Count = freq[min2Index];
        if (typeof min2Count == 'object')
            min2Count = min2Count.count
        delete freq[min2Index];

        var min1 = new Object();
        min1.count = min1Count;
        min1.index = min1Index;

        var min2 = new Object();
        min2.count = min2Count;
        min2.index = min2Index;

        var obj = new Object();
        obj.min1Index = min1;
        obj.min2Index = min2;
        obj.count = min1Count + min2Count;

        // insert the new one, a binary tree
        freq[min1Index + "+" + min2Index] = obj;

    }
}

/*
 * 查找当前freq中，count最小的那一个字符
 */
function findMinIndex(freq) {
    var minCount = 100000;
    var minIndex = -1;

    // use jQuery each function to iterate each key&value
    $.each(freq, function (index, value) {

        // if the node is only a value&key
        if (typeof value == 'number') {
            // store the min count and index
            if (value < minCount) {
                minCount = value;
                minIndex = index;
            }
        }

        // else if the node is a tree
        else {
            if (value.count < minCount) {
                minCount = value;
                minIndex = index;
            }
        }
    })

    return minIndex;
}
