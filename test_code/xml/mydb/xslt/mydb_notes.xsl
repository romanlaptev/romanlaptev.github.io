<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<meta charset="utf-8"/>
<title>my notes</title>
<head>
<style>
.section
{
	display:none;
	border:1px solid;
	margin:10px;
	padding:10px;
}
.close
{
	/*float:right;*/
	margin:10px;
}

</style>
</head>
<body>


<h2><xsl:value-of select="document('export_mydb_notes.xml')/book/@title"/></h2>
<pre><xsl:value-of select="document('export_mydb_notes.xml')/book/body"/></pre>

<div class="top_level">
<ul>
<xsl:for-each select="document('export_mydb_notes.xml')/book/page">
<!-- <b><xsl:number/>. </b> -->
	<xsl:variable name="n1" select="position()"/>
	<li>
<a href="#" onClick="javascript:document.getElementById('{$n1}_top_level_page_{position()}').style.display = 'block';">
<xsl:value-of select="@title"/>
</a>
	<!-- ########################################################################################### -->
		<div class="sec_level">
		<ul>
		<xsl:for-each select="./page">
			<xsl:variable name="n2" select="position()"/>
			<li>
<a href="#" onClick="javascript:document.getElementById('{$n1}_sec_level_page_{position()}').style.display = 'block';">
<xsl:value-of select="@title"/>
</a>
		<!-- ########################################################################################### -->
				<div class="low_level">
				<ul>
				<xsl:for-each select="./page">

<!-- <xsl:variable name="id" select="'{$n1}_low_level_page_{position()}"/> -->
					<li>
<a href="#" onClick="javascript:document.getElementById('{$n2}_low_level_page_{position()}').style.display = 'block';">
<xsl:value-of select="@title"/>
</a>
						<div class="section" id="{$n2}_low_level_page_{position()}">
<div class="close">
<a href="#" onClick="javascript:document.getElementById('{$n2}_low_level_page_{position()}').style.display = 'none';">close</a>
</div>
							<pre><xsl:value-of select="body"/></pre>
<div class="close">
<a href="#" onClick="javascript:document.getElementById('{$n2}_low_level_page_{position()}').style.display = 'none';">close</a>
</div>
						</div>
					</li>
				</xsl:for-each>
				</ul>
				</div><!-- end low_level -->
		<!-- ########################################################################################### -->

				<div class="section" id="{$n1}_sec_level_page_{position()}">
<div class="close">
<a href="#" onClick="javascript:document.getElementById('{$n1}_sec_level_page_{position()}').style.display = 'none';">close</a>
</div>
					<pre><xsl:value-of select="body"/></pre>
<div class="close">
<a href="#" onClick="javascript:document.getElementById('{$n1}_sec_level_page_{position()}').style.display = 'none';">close</a>
</div>
				</div>

			</li>
		</xsl:for-each>
		</ul>
		</div><!-- end sec_level -->
	<!-- ########################################################################################### -->

		<div class="section" id="{$n1}_top_level_page_{position()}">
<div class="close">
<a href="#" onClick="javascript:document.getElementById('{$n1}_top_level_page_{position()}').style.display = 'none';">close</a>
</div>
			<pre><xsl:value-of select="body"/></pre>
<div class="close">
<a href="#" onClick="javascript:document.getElementById('{$n1}_top_level_page_{position()}').style.display = 'none';">close</a>
</div>
		</div>

	</li>
</xsl:for-each>
</ul>
</div>

</body>
</html>

</xsl:template>
</xsl:stylesheet>

