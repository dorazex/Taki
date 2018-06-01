//this is the caretaker part of the memento design pattern of undo and redo

function UndoCaretaker() {
    ////////// private properties
    this.undoFrames = [];
    this.redoFrames = [];

    ////////// private methods

    ////////// public methods

    this.pushUndoFrame = function (frame) {
        this.undoFrames.push(frame)
    };

    this.pushRedoFrame = function (frame) {
        this.redoFrames.push(frame)
    };

    this.popUndoFrame = function () {   //get undo frame to restore prev state
        if (this.undoFrames.length == 0) {
            return null;
        }

        return this.undoFrames.pop();
    };

    this.popRedoFrame = function () {   //call this if you want to redo
        if (this.redoFrames.length == 0) {
            return null;
        }

        return this.redoFrames.pop();
    };

    this.resetAllFrames = function () {
        clearArray(this.redoFrames);
        clearArray(this.undoFrames);
    };
};


export default UndoCaretaker;