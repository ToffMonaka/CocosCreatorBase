/**
 * @file Result.java
 * @brief 結果用Javaファイル
 */


//パッケージ
package com.toff_monaka.excel_to_csv.main;


/**
 * 結果クラス
 */

public class Result
{
	public int val; //値
	
	
	/**
	 * コンストラクタ
	 */
	
	public Result()
	{
		this.ready();
		
		return;
	}

	
	/**
	 * 準備関数
	 */
	
	private void ready()
	{
		this.val = 0;
		
		return;
	}
	
	
	/**
	 * クリア関数
	 */
	
	public void clear()
	{
		this.ready();
		
		return;
	}

	
	/**
	 * 作成関数
	 * 
	 * @param res …結果
	 * 
	 * @return 結果値(0未満=失敗)
	 */
	
	public int create(Result res)
	{
		if (this == res) { //自身の時
			return (0);
		}
		
		this.val = res.val;
		
		return (0);
	}

	
	/**
	 * 作成関数
	 * 
	 * @param val …値
	 * 
	 * @return 結果値(0未満=失敗)
	 */
	
	public int create(int val)
	{
		this.val = val;
		
		return (0);
	}

	
	/**
	 * 削除関数
	 */
	
	public void delete()
	{
		this.release();
		this.clear();
		
		return;
	}

	
	/**
	 * 解放関数
	 */
	
	public void release()
	{
		return;
	}
}
