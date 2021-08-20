import VirtualElement from '../virtualElement'

test('VirtualElement', () => {

    const element = new VirtualElement('div', ['test-class'], {
        id: 'testId',
        customAttr: 'test'
    });

    expect(element.tagName).toEqual('div');
    expect(element.cssClasses).toEqual(['test-class']);
    expect(element.getAttribute('id')).toEqual('testId');
    expect(element.getAttribute('customAttr')).toEqual('test');

    element.setAttribute('test', 'ok');
    expect(element.getAttribute('test')).toEqual('ok');

    let eventFireCount = 0;


    element.on('click', () => {
        eventFireCount++;
    })

    element.on('click', () => {
        eventFireCount++;
    })

    // Fire click event
    element.fireEvent('click', null);

    expect(eventFireCount).toEqual(2);

});