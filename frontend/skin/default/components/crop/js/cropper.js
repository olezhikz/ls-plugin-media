/**
 * Crop
 *
 * @module ls/crop
 *
 * @license   GNU General Public License, version 2
 * @copyright 2013 OOO "ЛС-СОФТ" {@link http://livestreetcms.com}
 * @author    Oleg Demidov
 */

(function($) {
    "use strict";

    $.widget( "livestreet.mediaCropper", $.livestreet.lsComponent, {
        /**
         * Дефолтные опции
         */
        options: {
            urls: {
                crop: aRouter['media'] + 'crop-image'
            },

            cropper:{
                aspectRatio: 1/1,
                viewMode: 2,
                autoCropArea: 0.5,
                guides: false,
                center: false,
                background: false,
                rotatable: false,
                zoomable: false,
                scalable: false
            },
            selectors: {
                modal: "@#cropModal",
                image: "[data-crop-image]",
                body: ".modal-body"
            },
            onCrop:null
        },

        /**
         * Конструктор
         *
         * @constructor
         * @private
         */
        _create: function () {
            this._super();
            
            this.option('cropper').aspectRatio = this.element.data('aspectRatio');
            
            this.elements.modal.on('shown.bs.modal', function(){
                let body = this.elements.modal.find(this.option('selectors.body'));
                body.css('max-height', '500px')
                this.option('cropper').minContainerWidth = body.width();
                this.element.cropper(this.option('cropper'));
            }.bind(this));
            
            this.elements.modal.on('hide.bs.modal', function(){
                this._load(
                    'crop', 
                    {
                        size: this.getSelection(), 
                        canvasWidth:this.element.cropper('getImageData').naturalWidth
                    }, 
                    'onCrop'
                );
                this.element.cropper('destroy');
            }.bind(this));

        },
        
        onCrop: function(response){
            this._trigger('onCrop', null, response);
        },
        
        crop: function($media,  callback){
            this.option('onCrop', callback);
            this.setImage($media.mediaMedia('getWebPath'));
            
            this.option('params.id', $media.mediaMedia('option','id'));
            
            this.elements.modal.modal('show');
        },
        
        setImage: function(src){
            this.element.attr('src', src);
        },

        /**
         * 
         */
        getImage: function() {
            return this.element;
        },

        /**
         * 
         */
        getImageData: function() {
            return this.element.cropper('getImageData');
        },

        /**
         * 
         */
        getCanvasData: function() {
            return this.element.cropper('getCanvasData');
        },

        /**
         * 
         */
        getSelection: function() {
            var data = this.element.cropper('getData');

            return {
                x: data.x,
                y: data.y,
                x2: data.x + data.width,
                y2: data.y + data.height
            };
        },
        
        getDataOriginal: function() {
            return this.element.cropper('getData');
        },

        /**
         * 
         */
        getCanvas: function() {
            return this.element.cropper('getCroppedCanvas');

        }
    });
})(jQuery);