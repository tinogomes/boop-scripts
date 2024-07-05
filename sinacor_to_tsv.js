/**
    {
        "api":1,
        "name":"SINACOR B3 to CSV",
        "description":"Converts SINACOR data to CSV",
        "author":"tinogomes",
        "icon":"Text",
        "tags":"convert,sinacor,b3",
        "bias": -0.1
    }
**/

function main(input) {
  try {
    const data = input.text;

    const lines = data.split('\n');

    const header = lines.shift();

    if (!header.match(/\d\d\/\d\d\/\d\d\d\d,\w+/)) { throw `Requires on first line date and broker. ex: "27/05/2022,Rico"` }

    const [date, broker] = header.split(",");

    const regexp = /([CV]) +((?:WDO|WIN|BIT) ?\w\d\d) +@?\d\d\/\d\d\/\d\d\d\d +(\d+) +([\d,.]+) +DAY ?TRADE +[\d,.]+ +[DC] ([\d,.]+)/g
    const result = `${date}\t$2\t$1\t$3\t$4\t$5\t${broker}`

    input.text = lines.join('\n').replace(regexp, result)
  }
  catch (err) {
    input.postError(err);
  }
}
