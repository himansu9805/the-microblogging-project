import React from 'react';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  EditorState,
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HashtagNode } from '@lexical/hashtag';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mergeRegister } from '@lexical/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faUndo,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/editor.scss';



const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  return (
    <div className="editor-toolbar min-w-52 h-10 m-4 ml-0 rounded-xl mb-4 space-x-2 flex items-center">
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      >
        <FontAwesomeIcon icon={faBold} className="text-white w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      >
        <FontAwesomeIcon
          icon={faStrikethrough}
          className="text-white w-3.5 h-3.5"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      >
        <FontAwesomeIcon icon={faItalic} className="text-white w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      >
        <FontAwesomeIcon
          icon={faUnderline}
          className="text-white w-3.5 h-3.5"
        />
      </button>

      <span className="w-[1px] bg-gray-600 block h-full"></span>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignLeft}
          className="text-white w-3.5 h-3.5"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignCenter}
          className="text-white w-3.5 h-3.5"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignRight}
          className="text-white w-3.5 h-3.5"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignJustify}
          className="text-white w-3.5 h-3.5"
        />
      </button>

      {/* <span className="w-[1px] bg-gray-600 block h-full"></span>

      <button
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, void 0);
        }}
      >
        <FontAwesomeIcon icon={faUndo} className="text-white w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, void 0);
        }}
      >
        <FontAwesomeIcon icon={faRedo} className="text-white w-3.5 h-3.5" />
      </button> */}
    </div>
  );
};

const ErrorBoundary: React.FC = (children: any) => {
  return <>{children}</>;
};


export const Editor = () => {
  const loadContent = () => {
    let value = localStorage.getItem('editorState');
    if (value) return value;
    value =
      '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
    return value;
  };

  const initialEditorState = loadContent();
  const initialConfig = {
    namespace: 'Post Update',
    theme: {
      paragraph: 'mb-1',
      rtl: 'text-right',
      ltr: 'text-left',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
      },
    },
    onError(error: Error) {
      throw error;
    },
    nodes: [HashtagNode],
    editorState: initialEditorState,
  };
  const [editorState, setEditorState] = React.useState<EditorState | null>(
    null,
  );

  const onChange = (state: EditorState) => {
    // state.read(() => {
    //   const root = $getRoot();
    //   const selection = $getSelection();
    //   console.log(selection);
    // });
    setEditorState(state);
  };

  const handlePost = () => {
    if (!editorState) return;
    localStorage.setItem('editorState', JSON.stringify(editorState));
  };

  return (
    <div className="relative flex flex-col justify-center items-center rounded-xl w-full mb-2">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="text-xl w-full outline-none py-[15px] px-4 resize-none overflow-hidden text-ellipsis" />
          }
          placeholder={
            <div className="absolute top-[15px] left-[15px] pointer-events-none select-none text-gray-500 text-xl">
              Updates are public. Anyone can see what you write here.
            </div>
          }
          ErrorBoundary={ErrorBoundary}
        />
        <HashtagPlugin />
        <div className="w-full flex justify-between items-center px-4">
          <Toolbar />
          <button
            className="feed-post-button text-white font-bold my-4 py-2 px-4 rounded-lg"
            onClick={handlePost}
          >
            POST
          </button>
        </div>
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
};