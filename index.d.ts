export type Config = { [key: string]: any };

export interface EvalOption {
    error?: Error,
    format?: (expression: string, data: Config, opt: EvalOption) => { expression: string, data: Config, opt: EvalOption }
}

export interface NativeEvalOption extends EvalOption {
    interpolate?: boolean,
    destructuring?: boolean,
    target?: string,
}

export interface Evaluator {
    run(expression: string, data?: Config, opt?: EvalOption): boolean | number | string;
    sanitize(expression: string): string;
}

export interface NativeEval extends Evaluator {
    evaluate(expression: string, data: Config, opt: NativeEvalOption): boolean | number | string;
    format(expression: string, data: Config, opt: NativeEvalOption): { expression: string, data: Config, opt: NativeEvalOption };
    destructuring(scope: Config): string;
    interpolate(expression: string, data: Config): string;
}

export interface ParserEval extends Evaluator {
    tokenize(expression: string): string[]
}

export function get(name: string, params: any[]): Evaluator | NativeEval | ParserEval;