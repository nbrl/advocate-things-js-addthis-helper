var expect = require('expect.js');
var sinon = require('sinon');

describe('the Addthis helper interface', function () {
    it('should be an object', function () {
        expect(addthisHelper).to.be.an('object');
    });

    it('should have an Init function', function () {
        expect(addthisHelper.Init).to.be.a('function');
    });

    it('should have a RegisterSharepointSaveHandler function', function () {
        expect(addthisHelper.RegisterSharepointSaveHandler).to.be.a('function');
    });

    it('should have an RegisterAddthisShareListener function', function () {
        expect(addthisHelper.RegisterAddthisShareListener).to.be.a('function');
    });

    it('should have a SharePage function', function () {
        expect(addthisHelper.SharePage).to.be.a('function');
    });

    it('should have a constructUrlToShare function', function () {
        expect(addthisHelper.constructUrlToShare).to.be.a('function');
    });

    it('should have an error function', function () {
        expect(addthisHelper.error).to.be.a('function');
    });
});