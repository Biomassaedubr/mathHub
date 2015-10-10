/**
 * Created by yuchen.hou on 15-10-07.
 */

var MarkdownEditor = React.createClass({
    getInitialState: function() {
        if(this.props.body == null)
            return {value: 'Type some *markdown* here!\n\nasciiMath in \n\n %sum_(i=1)^n i^3=((n(n+1))/2)^2%\n\nand LaTeX in $$sin A cos B$$'};
        else
            return {value: this.props.body};
    },
    componentDidMount: function() {
        var el = $(this.getDOMNode());
        var component = this;
        var editorField = document.getElementById("editor");
        //set up editor
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/markdown");
        editor.getSession().on('change', function() {
            component.handleChange(editor.getValue());
        });
        editor.setValue(this.state.value, -1);
    },
    handleChange: function(val) {
        this.setState({value: val}, this.postHandleChange(val));
    },
    postHandleChange: function(event){
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"preview"]);
    },
    rawMarkup: function() {
        return { __html: marked(this.state.value, {sanitize: true}) };
    },
    render: function() {
        return (
            <div id="markdown-editor" className="row">
                <div className="col-md-6">
                    <label className="title-label">Create snippet</label>
                    <div
                        onChange={this.handleChange}
                        id="editor"
                        />
                    <textarea name="snippet[body]"
                        value={this.state.value}
                        className="hidden"/>
                </div>
                <div className="col-md-6">
                    <label className="title-label">Preview</label>
                    <div
                        className="content"
                        id="preview"
                        dangerouslySetInnerHTML={this.rawMarkup()}
                        />
                </div>
            </div>
            );
        }
});
