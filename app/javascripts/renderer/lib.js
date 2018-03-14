
/* jshint asi: true */
/* jshint browser: true */
/* jshint laxbreak: true */
/* jshint esversion: 6 */

(function()
{
    'use strict'

    const self = window.lib =
    {
        GET: (theUrl, cb) =>
        {
            const xmlHttp = new XMLHttpRequest()

            xmlHttp.onreadystatechange = function()
            {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                {
                    try
                    {
                        const parsed = JSON.parse(xmlHttp.responseText)

                        cb(parsed)
                    }
                    catch (err)
                    {
                        cb({})
                    }
                }
            }

            xmlHttp.open("GET", theUrl, true) // true for asynchronous
            xmlHttp.send(null)
        },

        every: (minutes, fn) =>
        {
            if (minutes && fn && fn.apply)
            {
                setInterval(fn, 1000 * 60 * minutes)
            }
        },

        changeLast: function(options, cb)
        {
            if (cb)
            {
                let request
                let time

                if (options.minutes)
                {
                    time = !isNaN(options.minutes) ? options.minutes : 5

                    request = 'histominute'
                }
                else if (options.days && options.days === 1)
                {
                    time = 1

                    request = 'histoday'
                }
                else if (options.days && options.days > 1)
                {
                    time = !isNaN(options.days) ? options.days : 7

                    time--

                    request = 'histoday'
                }
                else if (options.hours && options.hours === 1)
                {
                    time = 59

                    request = 'histominute'
                }
                else
                {
                    time = !isNaN(options.hours) ? options.hours : 1

                    time = time * 60

                    request = 'histominute'
                }


                const exchange = options.exchange || 'CCCAGG'


                const curr = options.currency || 'BTC'
                const fiat = options.fiat || 'USD'

                const url = `https://min-api.cryptocompare.com/data/${request}?`
                          + `fsym=${curr}&tsym=${fiat}`
                          + `&limit=${time}`
                          + `&e=${exchange}`
                          + '&aggregate=1'

                self.GET(url, res =>
                {
                    if (res && res.Data && res.Data.length)
                    {
                        const first = res.Data[0].open
                        const last  = res.Data[res.Data.length - 1].close

                        const change = (last - first) / first

                        console.log(`"${url}" => ${change}`)

                        cb(change)
                    }
                    else
                    {
                        cb(null)
                    }
                })
            }
        }
    }

})()
