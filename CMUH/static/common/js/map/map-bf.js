const map = '/myProjects/CMUH/static/common/img/map/map_BF@2x.png'
const zoom = 1
const data = {
    bf: {
        text: { val: '', loc: 'none', },
        items: { 
            'WP-21': { type: 'WP', text: { val: '輻射廢水\n暫存池2', loc: 't,l', }, style: { x: 92.7, y: 9.2, }, rect: [ { w: 24, h: 34, } ], },
            'WP-22': { type: 'WP', text: { val: '輻射廢水\n暫存池1', loc: 'b,r', }, style: { x: 96.1, y: 14.0, }, rect: [ { w: 22, h: 22, } ], },
            'WP-23': { type: 'WP', text: { val: '固態廢棄物\n暫存池', loc: 'b', }, style: { x: 84.2, y: 8.4, }, rect: [ { x: 0, y: 0, w: 35, h: 20, }, { x: 40, y: 0, w: 35, h: 20, } ], },
            'WP-24': { type: 'WP', text: { val: '集水坑', loc: 't', }, style: { x: 7.5, y: 19.4,}, rect: [ { w: 36, h: 24, }, ], },
            'WP-25': { type: 'WP', text: { val: '集水坑', loc: 'l', }, style: { x: 63.0, y: 90.1, }, rect: [ { w: 24, h: 36, }, ], },
            'WP-26': { type: 'WP', text: { val: '汙水暫存池', loc: 'r', }, style: { x: 72.7, y: 92.8, }, rect: [ { w: 24, h: 36, }, ], },

            'PD|#21': { type: 'PD', text: { val: '#21', loc: 't,l', }, popup: '#21', percent: -1, style: { x: 97.2, y: 10.2, }, },
            'PD|#22': { type: 'PD', text: { val: '#22', loc: 't,l', }, popup: '#22', percent: -1, style: { x: 91.8, y: 14.6, }, },
            'PD|#23': { type: 'PD', text: { val: '#23', loc: 't,l', }, popup: '#23', percent: -1, style: { x: 87.1, y: 6.1, }, },
        },
    }
}

export default { 
    map,
    zoom,
    data,
}