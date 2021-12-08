interface Options {
	/*
	 *  十的口语化开关, 默认值为 false
	 *	注: Nzh.cn和Nzh.hk中的encodeS方法默认 true
	 * */
	tenMin?: boolean
	/**
	 * "万万"化开关, 默认值为 true
	 * */
	ww?: boolean
}
interface ToMoneyOptions extends Options {
	/**
	 * 输出完整金额开关, toMoney 函数专用配置, 默认 false
	 * */
	complete?: boolean
	/*
	 * 输出金额前缀字符, toMoney 函数专用配置, 默认 true
	 * */
	outSymbol?: boolean
}
interface Lang {
	ch: string
	ch_u: string
	ch_f: string
	ch_d: string
	m_t: string
	m_z: string
	m_u: string
}
interface Langs {
	s: Lang
	b: Lang
	hk_s: Lang
	hk_b: Lang
}
interface BuiltIn {
	encodeS(num: number, options?: Options)
	encodeB(num: number, options?: Options)
	decodeS(num: number, options?: Options)
	decodeB(num: number, options?: Options)
	toMoney(num: number, options?: ToMoneyOptions)
}

declare module 'nzh' {
	export default class Nzh {
		constructor(lang: Lang)
		public encode(num: number, options?: Options)
		public decode(num: number, options?: Options)
		public toMoney(num: number, options?: ToMoneyOptions)

		static cn: BuiltIn
		static hk: BuiltIn
		static langs: Langs
	}
}

declare module 'nzh/cn' {
	function encodeS(num: number, options?: Options)
	function encodeB(num: number, options?: Options)
	function decodeS(num: number, options?: Options)
	function decodeB(num: number, options?: Options)
	function toMoney(num: number, options?: ToMoneyOptions)
}

declare module 'nzh/hk' {
	function encodeS(num: number, options?: Options)
	function encodeB(num: number, options?: Options)
	function decodeS(num: number, options?: Options)
	function decodeB(num: number, options?: Options)
	function toMoney(num: number, options?: ToMoneyOptions)
}
