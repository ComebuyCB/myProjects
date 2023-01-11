const map = '/myProjects/CMUH/static/common/img/map/map_B2-214@2x.png'
const zoom = 1.65
const data = {
    b209: {
        text: { val: '209', }, style: { x: 11.9, y: 74.5, },
        items: {
            'EB|C-1': { type: 'EB', status: -1, text: { val: 'EB|C-1', loc: 't,l', }, style: { x: 4.5, y: 71.2, }, },
            'EB|C-2': { type: 'EB', status: -1, text: { val: 'EB|C-2', loc: 't,r', }, style: { x: 20.5, y: 71.2, }, },
        },
    },
    b211: {
        text: { val: '211', }, style: { x: 34.4, y: 74.5, },
        items: {
            // 'JO-2|211': { type: 'JO-2', style: { x: 61.8, y: 65.5, }, },
        },
    },
    b212: {
        text: { val: '212', }, style: { x: 63.6, y: 74.5, },
        items: {
            'LB-03': { type: 'LB', status: -1, text: { val: 'LB-03', loc: 't', }, style: { x: 67.8, y: 59.8, }, },
            'EBF-2': { type: 'EB', status: -1, text: { val: 'EBF-2', loc: 'b', }, style: { x: 72.8, y: 60.8, }, },
            'DL-06': { type: 'DL', status: -1, text: { val: 'DL-06', loc: 't', }, style: { x: 76.9, y: 60.8, }, },
            'D-06': { type: 'SD', statusBy: 'DL-06', style: { x: 83.1, y: 58.8, rotate: 90, }, },
            'L-06': { type: 'L', status: -1, style: { x: 81.1, y: 63.1, }, },
            // 'JO-2|212': { type: 'JO-2', style: { x: 83.6, y: 75.9, }, },

            'ND|212': { type: 'ND', percent: -1, popup: '212', style: { x: 59.2, y: 61.4, }, },
            'PD|212': { type: 'PD', percent: -1, popup: '212', style: { x: 59.2, y: 64.9, }, },
        },
    },
    b213: {
        text: { val: '213' }, style: { x: 88.0, y: 52.8, },
        items: {
            'EB|2-4': { type: 'EB', status: -1, text: { val: 'EB|2-4', loc: 'b,r', }, style: { x: 91.0, y: 60.2, }, },
            'DL-07': { type: 'DL', status: -1, text: { val: 'DL-07', loc: 'r', }, style: { x: 85.0, y: 38.5, }, },
            'D-07': { type: 'RD-1', statusBy: 'DL-07', style: { x: 86.1, y: 34.2, rotate: 90, }, },
            'L-07': { type: 'L', status: -1, style: { x: 79.2, y: 38.3, }, },
        },
    },
    b214: {
        text: { val: '214'}, style: { x: 55.2, y: 37.6, },
        items: {
            'EB|2-1': { type: 'EB', status: -1, text: { val: 'EB|2-1', loc: 'b,l' }, style: { x: 52.0, y: 27.9, }, },
            'EB|2-2': { type: 'EB', status: -1, text: { val: 'EB|2-2', loc: 'b' }, style: { x: 57.2, y: 43.9, }, },
            'EB|2-3': { type: 'EB', status: -1, text: { val: 'EB|2-3', loc: 'r' }, style: { x: 77.1, y: 29.2, }, },
            'BEAM-214': { type: 'BEAM-R', status: -1, text: { val: '214', loc: 'none', }, style: { x: 53.0, y: 28.0, }, },
            // 'PA|214-1': { type: 'PA', style: { x: 89.8, y: 44.5, }, },
            // 'JO-2|214-1': { type: 'JO-2', style: { x: 71.5, y: 45.8, rotate: 90, }, },

            'ND|214': { type: 'ND', percent: -1, popup: '214', style: { x: 67.3, y: 39.9, }, },
            'PD|214': { type: 'PD', percent: -1, popup: '214', style: { x: 67.3, y: 43.4, }, },
        },
    },
}

export default { 
    map,
    zoom,
    data,
}