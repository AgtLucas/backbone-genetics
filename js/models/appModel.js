define(['underscore', 'backbone', 'models/geneticStringModel', 'collections/geneticStringCollection', 'models/overlapGraphModel'],
    function(_, Backbone, GeneticStringModel, GeneticStringCollection, OverlapGraphModel){
        'use strict';
        var AppModel = Backbone.Model.extend({
            initialize: function(){
                this.strings = new GeneticStringCollection();
                this.overlapGraph = new OverlapGraphModel({},{
                    nodes: this.strings
                });
                this.listenTo(this.strings, 'add remove reset', this.regenerateOverlapGraph);
            },

            addString: function(options){
                options = options || {};
                var newString = new GeneticStringModel(options);
                if (!newString.isValid()){
                    return {
                        error: newString.validationError
                    }
                }
                var existing = this.strings.findWhere({
                    name: options.name
                });
                if (existing){
                    return {
                        error: 'String with such name already exists'
                    };
                }
                this.strings.add(newString);
                return {
                    success: true
                };
            },

            regenerateOverlapGraph: function(){
                this.overlapGraph.regenerate();
            }
        });
        return AppModel;
    });