var expect = require('expect.js');
var sinon = require('sinon');

describe('the Addthis helper interface', function () {
    it('should be an object', function () {
        expect(addthisHelper).to.be.an('object');
    });

    it('should have a registerSharepointSaveHandler function', function () {
        expect(addthisHelper.registerSharepointSaveHandler).to.be.a('function');
    });

    it('should have a constructUrlToShare function', function () {
        expect(addthisHelper.constructUrlToShare).to.be.a('function');
    });

    it('should have an registerAddthisShareListener function', function () {
        expect(addthisHelper.registerAddthisShareListener).to.be.a('function');
    });

    it('should have an error function', function () {
        expect(addthisHelper.error).to.be.a('function');
    });
});