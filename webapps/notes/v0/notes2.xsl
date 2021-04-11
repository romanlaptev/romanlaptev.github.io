<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> test xml </title>
<head></head>
<body>

<h1> my notes   </h1>
<!--
<xsl:for-each select="notes/section/note">
text_note=
<p><xsl:value-of select="text_note"/></p>
</xsl:for-each>
-->

<xsl:for-each select="notes/section">
№<xsl:number/>.
<b>section=</b> <xsl:value-of select="@title"/>
<xsl:variable name="s_num" select="position()"/>
<p>section position <xsl:value-of select="$s_num"/> </p>

	<xsl:for-each select="note">
		<p>
		№<xsl:number/>.
		<b>text_note=</b> 
		<xsl:variable name="num" select="position()"/>
		<p>position <xsl:value-of select="$num"/> </p>
		<div style='display: visible; background-color: white; border-style:double; border-color:black;  padding:4mm;' id='div_{$num}'>
		<pre><xsl:value-of select="text_note"/></pre>
		</div>
		</p>
	</xsl:for-each>

</xsl:for-each>

</body>
</html>
</xsl:template>

</xsl:stylesheet>
