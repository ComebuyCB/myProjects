const map = '/myProjects/CMUH/static/common/img/map/map_B2@2x.png'
const zoom = 1
const data = {
    b201: {
        text: { val: '201', }, style: { x: 17.9, y: 81.4, },
    },
    b202: {
        text: { val: '202', }, style: { x: 17.9, y: 74.2, },
    },
    b203: {
        text: { val: '203', }, style: { x: 53.5, y: 81.9, },
    },
    b204: {
        text: { val: '204', }, style: { x: 63.5, y: 90.7, },
    },
    b205: {
        text: { val: '205', }, style: { x: 73, y: 94.5, },
        items: {
            'JO-2|205': { type: 'JO-2', style: { x: 70.2, y: 95.2, rotate: 90, }, },
        },
    },
    b205a: {
        text: { val: '205a', }, style: { x: 73.5, y: 89.7, },
        items: {
            'JO-2|205a': { type: 'JO-2', style: { x: 70.2, y: 88.6, rotate: 90, }, },
        },
    },
    b206: {
        text: { val: '206', }, style: { x: 31.4, y: 74.2, },
        items: {
            'LB-02': { type: 'LB', status: -1, text: { val: 'LB-02', loc: 't', }, style: { x: 28.7, y: 65.1, }, },
            'EBP-1': { type: 'EB', status: -1, text: { val: 'EBP-1', loc: 'b', }, style: { x: 26.0, y: 65.9, }, },
            'DL-05': { type: 'DL', status: -1, text: { val: 'DL-05', loc: 't', }, style: { x: 23.9, y: 65.8, }, },
            'D-05': { type: 'SD', statusBy: 'DL-05', style: { x: 25.5, y: 64.6, rotate: 90, }, },
            'L-05': { type: 'L', statusBy: 'DL-05', style: { x: 21.4, y: 67.3, }, },
            'JO-2|206': { type: 'JO-2', style: { x: 27.3, y: 75.9, }, },

            'ND|206': { type: 'ND', percent: -1, popup: '206', style: { x: 34.7, y: 66.1, }, },
            'PD|206': { type: 'PD', percent: -1, popup: '206', style: { x: 34.7, y: 68.1, }, },
        },
    },
    b207: {
        text: { val: '207', }, style: { x: 17.6, y: 59.6, },
        items: {
            'EB|1-4': { type: 'EB', status: -1, text: { val: 'EB|1-4', loc: 'b,l', }, style: { x: 16.0, y: 65.3, }, },
            'DL-04': { type: 'DL', status: -1, text: { val: 'DL-04', loc: 'l', }, style: { x: 20, y: 51.9, }, },
            'D-04': { type: 'RD-2', statusBy: 'DL-04', style: { x: 23.3, y: 50, rotate: 90, }, },
            'L-04': { type: 'L', statusBy: 'DL-04', style: { x: 22.8, y: 51.9, }, },
        },
    },
    b208: {
        text: { val: '208', }, style: { x: 36.5, y: 51.9, },
        items: {
            'EB|1-1': { type: 'EB', status: -1, text: { val: 'EB|1-1', loc: 't,r', }, style: { x: 39.0, y: 47.7, }, },
            'EB|1-2': { type: 'EB', status: -1, text: { val: 'EB|1-2', loc: 'b', }, style: { x: 35.9, y: 55.6, }, },
            'EB|1-3': { type: 'EB', status: -1, text: { val: 'EB|1-3', loc: 'l', }, style: { x: 24.3, y: 47.0, }, },
            'PA|208': { type: 'PA', style: { x: 21.8, y: 44.5, }, },
            'JO-2|208': { type: 'JO-2', style: { x: 39.7, y: 46.1, rotate: -90, }, },
            'BEAM-208': { type: 'BEAM-L', status: -1, text: { val: '208', loc: 'none', }, style: { x: 38.9, y: 46.2, }, },

            'ND|208': { type: 'ND', percent: -1, popup: '208', style: { x: 29.8, y: 53.4, }, },
            'PD|208': { type: 'PD', percent: -1, popup: '208', style: { x: 29.8, y: 55.4, }, },
        },
    },
    b209: {
        text: { val: '209', }, style: { x: 48.3, y: 74.2, },
        items: {
            'EB|C-1': { type: 'EB', status: -1, text: { val: 'EB|C-1', loc: 't,l', }, style: { x: 43.7, y: 72.0, }, },
            'EB|C-2': { type: 'EB', status: -1, text: { val: 'EB|C-2', loc: 't,r', }, style: { x: 53.1, y: 72.0, }, },
        },
    },
    b210: {
        text: { val: '210', }, style: { x: 55.8, y: 61.6, },
    },
    b211: {
        text: { val: '211', }, style: { x: 61.3, y: 74.2, },
        items: {
            'JO-2|211': { type: 'JO-2', style: { x: 61.8, y: 65.5, }, },
        },
    },
    b212: {
        text: { val: '212', }, style: { x: 79.4, y: 74.2, },
        items: {
            'LB-03': { type: 'LB', status: -1, text: { val: 'LB-03', loc: 't', }, style: { x: 82.5, y: 65.2, }, },
            'EBF-2': { type: 'EB', status: -1, text: { val: 'EBF-2', loc: 'b', }, style: { x: 85.4, y: 65.8, }, },
            'DL-06': { type: 'DL', status: -1, text: { val: 'DL-06', loc: 't', }, style: { x: 87.4, y: 65.8, }, },
            'D-06': { type: 'SD', statusBy: 'DL-06', style: { x: 90.9, y: 64.5, rotate: 90, }, },
            'L-06': { type: 'L', status: -1, style: { x: 90.1, y: 67.3, }, },
            'JO-2|212': { type: 'JO-2', style: { x: 83.6, y: 75.9, }, },

            'ND|212': { type: 'ND', percent: -1, popup: '212', style: { x: 76.7, y: 66.1, }, },
            'PD|212': { type: 'PD', percent: -1, popup: '212', style: { x: 76.7, y: 68.1, }, },
        },
    },
    b213: {
        text: { val: '213' }, style: { x: 94.1, y: 59.6, },
        items: {
            'EB|2-4': { type: 'EB', status: -1, text: { val: 'EB|2-4', loc: 'b,r', }, style: { x: 95.7, y: 65.3, }, },
            'DL-07': { type: 'DL', status: -1, text: { val: 'DL-07', loc: 'r', }, style: { x: 91.5, y: 51.9, }, },
            'D-07': { type: 'RD-1', statusBy: 'DL-07', style: { x: 92.7, y: 49.6, rotate: 90, }, },
            'L-07': { type: 'L', status: -1, style: { x: 88.8, y: 51.9, }, },
        },
    },
    b214: {
        text: { val: '214'}, style: { x: 74.8, y: 51.9, },
        items: {
            'EB|2-1': { type: 'EB', status: -1, text: { val: 'EB|2-1', loc: 'b,l' }, style: { x: 72.1, y: 45.3, }, },
            'EB|2-2': { type: 'EB', status: -1, text: { val: 'EB|2-2', loc: 'b' }, style: { x: 75.5, y: 55.7, }, },
            'EB|2-3': { type: 'EB', status: -1, text: { val: 'EB|2-3', loc: 'r' }, style: { x: 87.3, y: 47.0, }, },
            'PA|214-1': { type: 'PA', style: { x: 89.8, y: 44.5, }, },
            'JO-2|214-1': { type: 'JO-2', style: { x: 71.5, y: 45.8, rotate: 90, }, },
            'BEAM-214': { type: 'BEAM-R', status: -1, text: { val: '214', loc: 'none', }, style: { x: 72.7, y: 46.2, }, },

            'ND|214': { type: 'ND', percent: -1, popup: '214', style: { x: 81.6, y: 53.4, }, },
            'PD|214': { type: 'PD', percent: -1, popup: '214', style: { x: 81.6, y: 55.4, }, },
        },
    },
    b215: {
        text: { val: '215', }, style: { x: 84.0, y: 89.3, },
        items: {
            'JO-2|215': { type: 'JO-2', style: { x: 97.4, y: 95.1, rotate: -90, }, },
        },
    },
    b216: {
        text: { val: '216', }, style: { x: 93.9, y: 77.5, },
    },
    b217: {
        text: { val: '217', }, style: { x: 30.0, y: 36.5, },
        items: {
            'CBB1': { type: 'CB', status: -1, text: { val: 'CBB1', loc: 'b,l', }, style: { x: 21.7, y: 29.6, }, },
            'EBB1-1': { type: 'EB', status: -1, text: { val: 'EBB1-1', loc: 't', }, style: { x: 37, y: 29.6,  }, },
            'EBB1-2': { type: 'EB', status: -1, text: { val: 'EBB1-2', loc: 'b,r', }, style: { x: 40.4, y: 36.5, }, },
            'WL-02': { type: 'WL', status: -1, text: { val: 'WL-02', loc: 'b', }, style: { x: 34.5, y: 29.6, }, },
            'N2|217': { type: 'N2', style: { x: 40.1, y: 36.2, }, },
            'PA|217': { type: 'PA', style: { x: 40.1, y: 38.9, }, },

            'ND|217': { type: 'ND', percent: -1, popup: '217', style: { x: 23.8, y: 37.2, }, },
            'PD|217': { type: 'PD', percent: -1, popup: '217', style: { x: 23.8, y: 39.2, }, },
        },
    },
    b218: {
        text: { val: '218', }, style: { x: 49.2, y: 48, },
        items: {
            'CBC-1': { type: 'CB', status: -1, text: { val: 'CBC-1', loc: 'b', }, style: { x: 59.8, y: 49.7, }, },
            'EBC-1': { type: 'EB', status: -1, text: { val: 'EBC-1', loc: 't', }, style: { x: 60.5, y: 29.6, }, },
            'EBC-2': { type: 'EB', status: -1, text: { val: 'EBC-2', loc: 't', }, style: { x: 62.3, y: 49.7, }, },
            'FB-2': { type: 'FB', status: -1, text: { val: 'FB-2', loc: 't', }, style: { x: 55.5, y: 29.6, }, },
            'FB-3': { type: 'FB', status: -1, text: { val: 'FB-3', loc: 'b,r', }, style: { x: 67.3, y: 36.7, }, },
            'WL-03': { type: 'WL', status: -1, text: { val: 'WL-03', loc: 'b', }, style: { x: 58.0, y: 29.6, }, },
            'DL-02': { type: 'DL', status: -1, text: { val: 'DL-02', loc: 'l', }, style: { x: 42, y: 33.5, }, },
            'D-02': { type: 'RD-1', statusBy: 'DL-02', style: { x: 45.4, y: 30.5, rotate: 90, }, },
            'DL-03': {type: 'DL', status: -1, text: { val: 'DL-03', loc: 'r', }, style: { x: 69.8, y: 33.5, }, },
            'D-03': { type: 'RD-2', statusBy: 'DL-03', style: { x: 71, y: 30.5, rotate: 90, }, },
            'N2|218-1': { type: 'N2', style: { x: 44.5, y: 36.2, }, },
            'PA|218-1': { type: 'PA', style: { x: 44.5, y: 38.9, }, },
            'N2|218-2': { type: 'N2', style: { x: 67.0, y: 36.2, }, },
            'PA|218-2': { type: 'PA', style: { x: 67.0, y: 38.9, }, },
            'BEAM-218': { type: 'BEAM-M', status: -1, text: { val: '218', loc: 'none', }, style: { x: 56.1, y: 40.9, }, },

            'ND|218': { type: 'ND', percent: -1, popup: '218', style: { x: 46.7, y: 37.2, }, },
            'PD|218': { type: 'PD', percent: -1, popup: '218', style: { x: 46.7, y: 39.2, }, },
        },
    },
    b219: {
        text: { val: '219', }, style: { x: 80.7, y: 36.5, },
        items: { 
            'EBB2-1': { type: 'EB', status: -1, text: { val: 'EBB2-1', loc: 't', }, style: { x: 77.0, y: 29.6, } }, 
            'EBB2-2': { type: 'EB', status: -1, text: { val: 'EBB2-2', loc: 'b,l', }, style: { x: 71.3, y: 36.7,} }, 
            'CBB2': { type: 'CB', status: -1, text: { val: 'CBB2', loc: 'b,r', }, style: { x: 90.0, y: 29.6, } }, 
            'WL-04': { type: 'WL', status: -1, text: { val: 'WL-04', loc: 'b', }, style: { x: 79.5, y: 29.6, } }, 
            'N2|219': { type: 'N2', style: { x: 71.3, y: 36.2, }, },
            'PA|219': { type: 'PA', style: { x: 71.3, y: 38.9, }, },

            'ND|219': { type: 'ND', percent: -1, popup: '219', style: { x: 87.8, y: 37.2, }, },
            'PD|219': { type: 'PD', percent: -1, popup: '219', style: { x: 87.8, y: 39.2, }, },
        },
    },
    b220: {
        text: { val: '220', }, style: { x: 9, y: 42, },
    },
    b221: {
        text: { val: '221', }, style: { x: 9, y: 7.9, },
    },
    b222: {
        text: { val: '222', }, style: { x: 16.5, y: 7.9, },
        items: {
            'EBCC': { type: 'EB', status: -1, text: { val: 'EBCC', loc: 'l', }, style: { x: 18.7, y: 4.1, } }, 
        },
    },
    b223: { 
        text: { val: '223', }, style: { x: 23.5, y: 7.9, },
    },
    b224: { 
        text: { val: '224', }, style: { x: 31.5, y: 7.9, },
    },
    b225: { 
        text: { val: '225', }, style: { x: 56.7, y: 14.8 },
        items: {
            'FB-1': { type: 'FB', status: -1, text: { val: 'FB-1', loc: 't', }, style: { x: 36.2, y: 20.0,}, },
            'LB-01': { type: 'LB', status: -1, text: { val: 'LB-01', loc: 'b', }, style: { x: 39.0, y: 20.7, }, },
            'EBB-1': { type: 'EB', status: -1, text: { val: 'EBB-1', loc: 't', }, style: { x: 41.9, y: 20.0, }, },
            'WL-01': { type: 'WL', status: -1, text: { val: 'WL-01', loc: 'b', }, style: { x: 44.4, y: 20.0, }, },
            'DL-01': { type: 'DL', status: -1, text: { val: 'DL-01', loc: 't', }, style: { x: 46.6, y: 20.0, }, },
            'PA|225-1': { type: 'PA', style: { x: 55.1, y: 3.7, }, },

            'ND|225': { type: 'ND', percent: -1, popup: '225', style: { x: 42.7, y: 13.4, }, },
            'PD|225': { type: 'PD', percent: -1, popup: '225', style: { x: 42.7, y: 15.4, }, },
        },
    },
    b226: { 
        text: { val: '226', }, style: { x: 70.1, y: 5.3, },
        items: {
            'N2|226': { type: 'N2', style: { x: 67.5, y: 10.3, }, },
            'PA|226-1': { type: 'PA', style: { x: 70.0, y: 10.3, }, },
            'PA|226-2': { type: 'PA', style: { x: 75.8, y: 3.7, }, },

            'PD|226': { type: 'PD', percent: -1, popup: '226', style: { x: 81.2, y: 19.8, }, },
        },
    },
    b227: { 
        text: { val: '227', }, style: { x: 93.7, y: 6, },
    },
    b228: { 
        text: { val: '228', }, style: { x: 91.4, y: 15.5, },
        items: {
            'PA|228': { type: 'PA', style: { x: 89.8, y: 11.3, }, },

            'PD|228': { type: 'PD', percent: -1, popup: '228', style: { x: 91.8, y: 11.4, }, },
        },
    },
    b229: { 
        text: { val: '229', }, style: { x: 40, y: 7.9, },
        items: {
            'D|229': { type: 'SD', status: -1, style: { x: 47.4, y: 14.0, rotate: 180, }, },
            'PA|229': { type: 'PA', style: { x: 37.7, y: 5.4, }, },
        },
    },
}

export default { 
    map,
    zoom,
    data,
}