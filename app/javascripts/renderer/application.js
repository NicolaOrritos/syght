'use strict'

/* global lib */

const ipc = require('electron').ipcRenderer


function loadPair(name, pairClass)
{
    pairClass = '.' + pairClass

    const $5minutes = $(pairClass + '.changes .indicator.minutes-5 p')
    const $5minSpinner = $(pairClass + '.changes .indicator.minutes-5 .spinner')
    const $15minutes = $(pairClass + '.changes .indicator.minutes-15 p')
    const $15minSpinner = $(pairClass + '.changes .indicator.minutes-15 .spinner')
    const $hour = $(pairClass + '.changes .indicator.hour p')
    const $hourSpinner = $(pairClass + '.changes .indicator.hour .spinner')
    const $day = $(pairClass + '.changes .indicator.day p')
    const $daySpinner = $(pairClass + '.changes .indicator.day .spinner')
    const $week = $(pairClass + '.changes .indicator.week p')
    const $weekSpinner = $(pairClass + '.changes .indicator.week .spinner')
    const $month = $(pairClass + '.changes .indicator.month p')
    const $monthSpinner = $(pairClass + '.changes .indicator.month .spinner')

    function load5minChange()
    {
        lib.changeLast({minutes: 5}, change =>
        {
            let percentChange = (change * 100).toFixed(2)
                percentChange = (change > 0 ? '+' : '') + percentChange.toString()

            $5minutes.html(percentChange + '%')

            if (percentChange < 0)
            {
                $5minutes.css('background', '#e66')
            }
            else
            {
                $5minutes.css('background', '#6a6')
            }

            $5minSpinner.hide()
        })
    }

    function load15minChange()
    {
        lib.changeLast({minutes: 15}, change =>
        {
            let percentChange = (change * 100).toFixed(2)
            percentChange = (change > 0 ? '+' : '') + percentChange.toString()

            $15minutes.html(percentChange + '%')

            if (percentChange < 0)
            {
                $15minutes.css('background', '#e66')
            }
            else
            {
                $15minutes.css('background', '#6a6')
            }

            $15minSpinner.hide()
        })
    }

    function loadHourChange()
    {
        lib.changeLast({hours: 1}, change =>
        {
            let percentChange = (change * 100).toFixed(2)
            percentChange = (change > 0 ? '+' : '') + percentChange.toString()

            $hour.html(percentChange + '%')

            if (percentChange < 0)
            {
                $hour.css('background', '#e66')
            }
            else
            {
                $hour.css('background', '#6a6')
            }

            $hourSpinner.hide()
        })
    }

    function loadDayChange()
    {
        lib.changeLast({days: 1}, change =>
        {
            let percentChange = (change * 100).toFixed(2)
                percentChange = (change > 0 ? '+' : '') + percentChange.toString()

            $day.html(percentChange + '%')

            if (percentChange < 0)
            {
                $day.css('background', '#e66')
            }
            else
            {
                $day.css('background', '#6a6')
            }

            $daySpinner.hide()
        })
    }

    function loadWeekChange()
    {
        lib.changeLast({days: 7}, change =>
        {
            let percentChange = (change * 100).toFixed(2)
                percentChange = (change > 0 ? '+' : '') + percentChange.toString()

            $week.html(percentChange + '%')

            if (percentChange < 0)
            {
                $week.css('background', '#e66')
            }
            else
            {
                $week.css('background', '#6a6')
            }

            $weekSpinner.hide()
        })
    }

    function loadMonthChange()
    {
        lib.changeLast({days: 30}, change =>
        {
            let percentChange = (change * 100).toFixed(2)
                percentChange = (change > 0 ? '+' : '') + percentChange.toString()

            $month.html(percentChange + '%')

            if (percentChange < 0)
            {
                $month.css('background', '#e66')
            }
            else
            {
                $month.css('background', '#6a6')
            }

            $monthSpinner.hide()
        })
    }


    $5minSpinner.show()
    $15minSpinner.show()
    $hourSpinner.show()
    $daySpinner.show()
    $weekSpinner.show()
    $weekSpinner.show()

    $5minutes.html('Loading...')
    $15minutes.html('Loading...')
    $hour.html('Loading...')
    $day.html('Loading...')
    $week.html('Loading...')
    $month.html('Loading...')

    load5minChange()
    load15minChange()
    loadHourChange()
    loadDayChange()
    loadWeekChange()
    loadMonthChange()

    lib.every(2, load5minChange)
    lib.every(5, load15minChange)
    lib.every(5, loadHourChange)
    lib.every(10, loadDayChange)
    lib.every(10, loadWeekChange)
    lib.every(10, loadMonthChange)
}


ipc.on('loaded' , (event, data) =>
{
    const pairClass   = 'btcusd'
    const pairChanges = document.createElement('div')

    pairChanges.classList.add('changes')
    pairChanges.classList.add(pairClass)

    $('.all')[0].appendChild(pairChanges)

    $(pairChanges).html(`
        <div class="title">
            <h1>BTC-USD</h1>
        </div>
        <div class="row">
            <div class="indicator minutes-5">
                <span>5 minutes</span>
                <p class="value">Loading...</p>
                <div class="spinner"></div>
            </div>
            <div class="indicator minutes-15">
                <span>15 minutes</span>
                <p class="value">Loading...</p>
                <div class="spinner"></div>
            </div>
            <div class="indicator hour">
                <span>Hour</span>
                <p class="value">Loading...</p>
                <div class="spinner"></div>
            </div>
            <div class="indicator day">
                <span>Day</span>
                <p class="value">Loading...</p>
                <div class="spinner"></div>
            </div>
            <div class="indicator week">
                <span>Week</span>
                <p class="value">Loading...</p>
                <div class="spinner"></div>
            </div>
            <div class="indicator month">
                <span>Month</span>
                <p class="value">Loading...</p>
                <div class="spinner"></div>
            </div>
        </div>
    `)

    loadPair('BTCUSD', pairClass)


    $('.message #title').html(data.appName)
    $('.message #details').html('Built with Electron v' + data.electronVersion)
    $('.message #versions').html('Running on Node v' + data.nodeVersion + ' and Chromium v' + data.chromiumVersion)
})
