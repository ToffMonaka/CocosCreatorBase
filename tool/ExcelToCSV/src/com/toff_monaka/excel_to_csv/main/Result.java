/**
 * @file Result.java
 * @brief ���ʗpJava�t�@�C��
 */


//�p�b�P�[�W
package com.toff_monaka.excel_to_csv.main;


/**
 * ���ʃN���X
 */

public class Result
{
	public int val; //�l
	
	
	/**
	 * �R���X�g���N�^
	 */
	
	public Result()
	{
		this.ready();
		
		return;
	}

	
	/**
	 * �����֐�
	 */
	
	private void ready()
	{
		this.val = 0;
		
		return;
	}
	
	
	/**
	 * �N���A�֐�
	 */
	
	public void clear()
	{
		this.ready();
		
		return;
	}

	
	/**
	 * �쐬�֐�
	 * 
	 * @param res �c����
	 * 
	 * @return ���ʒl(0����=���s)
	 */
	
	public int create(Result res)
	{
		if (this == res) { //���g�̎�
			return (0);
		}
		
		this.val = res.val;
		
		return (0);
	}

	
	/**
	 * �쐬�֐�
	 * 
	 * @param val �c�l
	 * 
	 * @return ���ʒl(0����=���s)
	 */
	
	public int create(int val)
	{
		this.val = val;
		
		return (0);
	}

	
	/**
	 * �폜�֐�
	 */
	
	public void delete()
	{
		this.release();
		this.clear();
		
		return;
	}

	
	/**
	 * ����֐�
	 */
	
	public void release()
	{
		return;
	}
}
