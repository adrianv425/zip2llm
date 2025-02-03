export const getLanguageFromFilename = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
        case 'js':
        case 'jsx':
            return 'javascript';
        case 'py':
            return 'python';
        case 'java':
            return 'java';
        case 'html':
            return 'html';
        case 'css':
            return 'css';
        case 'json':
            return 'json';
        case 'xml':
            return 'xml';
        case 'yaml':
        case 'yml':
            return 'yaml';
        case 'md':
            return 'markdown';
        case 'sh':
        case 'bash':
            return 'bash';
        case 'c':
        case 'cpp':
        case 'h':
        case 'hpp':
            return 'cpp'; // Or 'c', you might want to differentiate further
        case 'cs':
            return 'csharp';
        case 'go':
            return 'go';
        case 'ts':
        case 'tsx':
            return 'typescript';
        case 'php':
            return 'php';
        case 'sql':
            return 'sql';
        case 'r':
            return 'r';
        case 'swift':
            return 'swift';
        case 'kt':
            return 'kotlin';
        case 'rb':
            return 'ruby';
        case 'dart':
            return 'dart';
        case 'rs':
            return 'rust';
        case 'scala':
            return 'scala';
        case 'perl':
        case 'pl':
            return 'perl';
        case 'lua':
            return 'lua';
        case 'groovy':
            return 'groovy';
        case 'vb':
            return 'visual-basic';
        case 'asm':
            return 'assembly';
        case 'clj':
        case 'cljs':
        case 'cljc':
            return 'clojure';
        case 'log':
            return 'bash';
        default:
            return 'text'; // Default to 'text' for unknown extensions
    }
};