const map = '/myProjects/CMUH/static/common/img/map/map_B2-208@2x.png'
const zoom = 1.65
const data = {
    b206: {
        text: { val: '206', }, style: { x: 47.7, y: 74.8, },
        items: {
            'LB-02': { type: 'LB', status: -1, text: { val: 'LB-02', loc: 't', }, style: { x: 44.0, y: 59.6, }, },
            'EBP-1': { type: 'EB', status: -1, text: { val: 'EBP-1', loc: 'b', }, style: { x: 39.0, y: 60.8, }, },
            'DL-05': { type: 'DL', status: -1, text: { val: 'DL-05', loc: 't', }, style: { x: 35.5, y: 60.8, }, },
            'D-05': { type: 'SD', statusBy: 'DL-05', style: { x: 37.0, y: 58.8, rotate: 90, }, },
            'L-05': { type: 'L', statusBy: 'DL-05', style: { x: 30.2, y: 62.7, }, },
            // 'JO-2|206': { type: 'JO-2', style: { x: 27.3, y: 75.9, }, },

            'ND|206': { type: 'ND', percent: -1, popup: '206', style: { x: 52.0, y: 60.8, }, },
            'PD|206': { type: 'PD', percent: -1, popup: '206', style: { x: 52.0, y: 64.0, }, },
        },
    },
    b207: {
        text: { val: '207', }, style: { x: 24.0, y: 51.9, },
        items: {
            'EB|1-4': { type: 'EB', status: -1, text: { val: 'EB|1-4', loc: 'b,l', }, style: { x: 21.1, y: 59.1, }, },
            'DL-04': { type: 'DL', status: -1, text: { val: 'DL-04', loc: 'l', }, style: {x: 27.5, y: 38.4, }, },
            'D-04': { type: 'RD-2', statusBy: 'DL-04', style: { x: 33.4, y: 34.8, rotate: 90, }, },
            'L-04': { type: 'L', statusBy: 'DL-04', style: { x: 32.2, y: 38.8, }, },
        },
    },
    b208: {
        text: { val: '208', }, style: { x: 55.2, y: 36.2, },
        items: {
            'EB|1-1': { type: 'EB', status: -1, text: { val: 'EB|1-1', loc: 't,r', }, style: { x: 59.7, y: 31.8, }, },
            'EB|1-2': { type: 'EB', status: -1, text: { val: 'EB|1-2', loc: 'b', }, style: { x: 55.8, y: 43.8, }, },
            'EB|1-3': { type: 'EB', status: -1, text: { val: 'EB|1-3', loc: 'l', }, style: { x: 35.0, y: 29.4, }, },
            'BEAM-208': { type: 'BEAM-L', status: 0, text: { val: '208', loc: 'none', }, style: { x: 59.0, y: 28.0, }, },
            // 'PA|208': { type: 'PA', status: 0, style: { x: 21.8, y: 44.5, }, },
            // 'JO-2|208': { type: 'JO-2', status: 0, style: { x: 39.7, y: 46.1, rotate: -90, }, },

            'ND|208': { type: 'ND', percent: -1, popup: '208', style: { x: 44.7, y: 39.6, }, },
            'PD|208': { type: 'PD', percent: -1, popup: '208', style: { x: 44.7, y: 42.9, }, },
        },
    },
    b209: {
        text: { val: '209', }, style: { x: 75.7, y: 74.8, },
        items: {
            'EB|C-1': { type: 'EB', status: -1, text: { val: 'EB|C-1', loc: 't,l', }, style: { x: 67.0, y: 71.6, }, },
            'EB|C-2': { type: 'EB', status: -1, text: { val: 'EB|C-2', loc: 't,r', }, style: { x: 82.9, y: 71.6, }, },
        },
    },
}

export default { 
    map,
    zoom,
    data,
}