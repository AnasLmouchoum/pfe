package com.ids;

public class Test {
	class Countr {
		public String cnt;
		public String[] ct;
	}

	public static void main(String[] args) throws Exception {
		String[] countr = new String[] { "maroc#rabat", "maroc#casa", "maroc#fes", "maroc#oujda", "maroc#tanger",
				"maroc#titouane", "maroc#araiche", "maroc#marakesh", "maroc#alyoune", "maroc#dakhla", "maroc#rachidia",
				"france#paris", "france#marseil", "france#nime", "france#lille", "france#toulouse", "tunisie#assima",
				"tunisie#jerba", "tunisie#ssfakess", "espagne#madrid", "espagne#barcelone", "espagne#malaga",
				"espagne#alicante", "espagne#cortova", "espagne#sivilla", "espagne#lione", "arabie saudi#makka",
				"arabie saudi#madina", "arabie saudi#riad", "arabie saudi#tabouk", };
		for (int i = 0; i < 1500; i++) {
			int k = rn(0, countr.length);
			String[] tab = countr[k].split("#");
			System.out.println(countr[k]);
		}
	}

	public static int rn(int min, int max) {
		return (int) ((Math.random() * (max - min)) + min);
	}
}
