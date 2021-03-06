define(['underscore', 'backbone', 'jquery', 'templates', 'views/geneticStringListView', 'views/overlapGraphView'],
    function(_, Backbone, $, templates, GeneticStringListView, OverlapGraphView){
        'use strict';
        var AppView = Backbone.View.extend({
            template: templates.jst('editor'),

            events: {
                'click button.add': 'addString',
                'click button.regenerate': 'regenerateOverlapGraph',
                'input input.sequence': '_sequenceToUpperCase'
            },

            initialize: function(){

            },

            render: function(){
                this.$el.html(this.template(this.model.attributes));
                this.ui = {
                    nameInput: this.$el.find('input.name'),
                    sequenceInput: this.$el.find('input.sequence'),
                    addButton: this.$el.find('button.add'),
                    stringList: this.$el.find('table.stringList'),
                    overlapGraph: this.$el.find('table.overlapGraph')
                };
                //rendering sequence list
                if (this.stringList){
                    this.stringList.remove();
                }
                this.stringList = new GeneticStringListView({
                    collection: this.model.strings,
                    el: this.ui.stringList
                });
                this.stringList.render();
                //rendering overlap graph
                if (this.overlapGraph){
                    this.overlapGraph.remove();
                }
                this.overlapGraph = new OverlapGraphView({
                    collection: this.model.overlapGraph.edges,
                    el: this.ui.overlapGraph
                });
                this.overlapGraph.render();
            },

            addString: function(){
                var result = this.model.addString({
                    name: this.ui.nameInput.val(),
                    sequence: this.ui.sequenceInput.val()
                });
                if (result.error){
                    alert(result.error);
                }
            },

            regenerateOverlapGraph: function(){
                this.model.regenerateOverlapGraph();
            },

            _sequenceToUpperCase: function(){
                this.ui.sequenceInput.val(this.ui.sequenceInput.val().toUpperCase());
            }

        });
        return AppView;
    });