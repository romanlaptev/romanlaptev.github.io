<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<meta charset="utf-8"/>

<script>
	console.log('Test XSLT!');
</script>

<style>
body{
	background:#9c9;
}
</style>

<body>
<h1><xsl:value-of select="xroot/title/."/></h1>

<!--
<xsl:variable name="url_content" select="'http://mycomp'"/>
<xsl:for-each select="document('export.xml')/albums/taxonomy_vocabulary/termin">
-->

<xsl:for-each select="xroot/xdata/playlist">
	<xsl:variable name="n1" select="concat('A', @title, position() )"/>

	<p><xsl:value-of select="name(.)"/> <xsl:number/></p>
	<p>Title: <xsl:value-of select="@title"/></p>
	<li><a href="{$n1}">variable n1</a></li>
<!--	
	<xsl:value-of select="." /><br/>
-->	
	<xsl:for-each select="child::*">
		<xsl:if test="name(.)='description'"><pre><xsl:value-of select="." /></pre></xsl:if>
		<xsl:if test="name(.)='location'"><p><xsl:value-of select="." /></p></xsl:if>
		<xsl:if test="name(.)='thumbnail'"><p><xsl:value-of select="@url" /></p></xsl:if>
	</xsl:for-each>
	
</xsl:for-each>

</body>
</html>

</xsl:template>
</xsl:stylesheet>